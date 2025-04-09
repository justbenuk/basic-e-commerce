import { getLatestProducts } from "@/actions/product-actions";
import ProductList from "@/components/products/product-list";

export default async function Home() {
  const data = await getLatestProducts();
  return (
    <>
      <ProductList data={data} title="Newest Arrivals" />
    </>
  );
}
