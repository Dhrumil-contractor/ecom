import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Instance } from '../../axios';
import { Routes } from '../../helpers/routeHelper';
import { addToCart } from '../../redux/cart/actions';

const Products = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [filterText, setFilterText] = useState('');

  const dispatch = useDispatch();

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
      setAllProducts(productList.products);
    })();
  }, [category]);

  useEffect(() => {
    if (filterText) {
      setProducts([
        ...allProducts.filter(
          (item) =>
            item.title.toLowerCase().includes(filterText.toLowerCase()) ||
            item.description.toLowerCase().includes(filterText.toLowerCase())
        ),
      ]);
    } else {
      setProducts([...allProducts]);
    }
  }, [allProducts, filterText]);

  const fetchProductByCategory = async (category) => {
    setIsLoading(true);
    return await Instance.get(`${Routes.product.category}/${category}`)
      .then((res) => res.data)
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
  };

  const filterProductsByText = (e) => setFilterText(e.target.value);

  const onCategoryChange = async (e) => {
    const cate = e.target.value;
    setCategory(cate);
  };

  const handleAddToCart = async (idx) => dispatch(addToCart(products[idx]));

  return isLoading ? (
    <div className="flex justify-center">Loading...</div>
  ) : (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-2 lg:max-w-7xl lg:px-8">
        <div className="flex justify-between my-2">
          <div>
            <input
              type="text"
              name="filterText"
              placeholder="search products"
              onChange={filterProductsByText}
              className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
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
          {products.map((product, idx) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none hover:opacity-75 lg:h-80">
                <img
                  src={product.thumbnail}
                  alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <span aria-hidden="true" className="absolute" />
                    {product.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.rating} &#9733;</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900">&#8377; {product.price}</p>
                  <p className="cursor-pointer" onClick={() => handleAddToCart(idx)}>
                    Add to cart
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
