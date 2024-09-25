/* eslint-disable @typescript-eslint/no-explicit-any */
import { FilterQuery, Query } from "mongoose";

class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;

    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: "i" },
            } as FilterQuery<T>)
        ),
      });
    }

    return this;
  }

  filter() {
    const queryObj = { ...this.query }; // copy

    // Filtering
    const excludeFields = [
      "searchTerm",
      "sort",
      "limit",
      "page",
      "fields",
      "minPrice",
      "maxPrice",
    ];

    excludeFields.forEach((el) => delete queryObj[el]);

    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  priceRange() {
    const minPrice = Number(this.query.minPrice);
    const maxPrice = Number(this.query.maxPrice);

    // Create a price condition object
    const priceConditions = {} as Record<any, unknown>;

    if (minPrice > 0) {
      priceConditions.$gte = minPrice; // Greater than or equal to minPrice
    }

    if (maxPrice > 0) {
      priceConditions.$lte = maxPrice; // Less than or equal to maxPrice
    }

    // If there are conditions, update modelQuery
    if (Object.keys(priceConditions).length > 0) {
      this.modelQuery = this.modelQuery.find({
        $expr: {
          $and: [
            {
              $gte: [
                { $arrayElemAt: ["$price.price", 0] },
                priceConditions.$gte || 0,
              ],
            },
            {
              $lte: [
                { $arrayElemAt: ["$price.price", 0] },
                priceConditions.$lte || Infinity,
              ],
            },
          ],
        },
      });
    }

    return this;
  }

  sort() {
    // Extract and format the sort string
    const sortField =
      (this?.query?.sort as string)?.split(",")?.join(" ") || "-createdAt";

    // Check if sorting by price is requested
    const sort = sortField.includes("price")
      ? sortField.replace("price", "price.0.price")
      : sortField;

    // Apply the sort to the Mongoose query
    this.modelQuery = this.modelQuery.sort(sort as string);

    // Return this for chaining
    return this;
  }

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  fields() {
    const fields =
      (this?.query?.fields as string)?.split(",")?.join(" ") || "-__v";

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
  async countTotal() {
    const totalQueries = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(totalQueries);
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 10;
    const totalPage = Math.ceil(total / limit);

    return {
      page,
      limit,
      total,
      totalPage,
    };
  }
}

export default QueryBuilder;
