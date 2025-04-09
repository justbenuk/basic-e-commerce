import React from "react";
import ProductItem from "./product-item";
import { Product } from "@/lib/types";

type Props = {
  data: Product[];
  title?: string;
};

export default function ProductList({ data, title }: Props) {
  return (
    <div className="my-10">
      <h2 className="h2-bold mb-4">{title}</h2>
      {data.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map((product: Product, idx: number) => (
            <ProductItem product={product} key={idx} />
          ))}
        </div>
      ) : (
        <p>No Products Found</p>
      )}
    </div>
  );
}
