import { useEffect, useState } from 'react';
import { Instance } from '../../axios';
import { Routes } from '../../helpers/routeHelper';

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');

  const fetchProducts = async () => {
    setIsLoading(true);
    return await Instance.get(Routes.product.products)
      .then((res) => res.data)
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const fetchCategories = async () => {
    return await Instance.get(Routes.product.categories)
      .then((res) => res.data)
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    (async () => {
      const categoryList = await fetchCategories();
      console.log({ categoryList });
      setCategories(categoryList);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let productList;
      if (category) {
        productList = await fetchProductByCategory(category);
      } else {
        productList = await fetchProducts();
      }
      setProducts(productList.products);
    })();
  }, [category]);

  const fetchProductByCategory = async (category) => {
    setIsLoading(true);
    return await Instance.get(`${Routes.product.category}/${category}`)
      .then((res) => res.data)
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const onCategoryChange = async (e) => {
    const cate = e.target.value;
    setCategory(cate);
  };

  return isLoading ? (
    <div className="flex justify-center">Loading...</div>
  ) : (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-2 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between my-2">
          <div>Products</div>
          {categories.length ? (
            <select name="category" defaultValue="" value={category} onChange={onCategoryChange}>
              <option value="">select category</option>
              {categories.map((cate) => (
                <option key={cate} name={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          ) : null}
        </div>
        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.thumbnail}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.rating} &#9733;</p>
                </div>
                <p className="text-sm font-medium text-gray-900">&#8377; {product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
