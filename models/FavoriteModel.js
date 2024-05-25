import mongoose from "mongoose";

const favoriteSchema = mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

favoriteSchema.index({ user: 1, post: 1 }, { unique: true });

export const favoriteModel = mongoose.Model("Favorite", favoriteSchema);
