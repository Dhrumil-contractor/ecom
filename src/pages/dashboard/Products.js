import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Instance } from '../../axios';
import { Routes } from '../../helpers/routeHelper';
import { addToCart } from '../../redux/cart/actions';
import { utils, writeFile } from 'xlsx';
import WithPagination from '../components/pagination';

const Products = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [filterText, setFilterText] = useState('');

  const dispatch = useDispatch();

  const fetchProducts = async (params) => {
    setIsLoading(true);
    return await Instance.get(`${Routes.product.products}?${params}`)
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

      const urlParams = new URLSearchParams();
      urlParams.set('limit', props.itemsPerPage);
      urlParams.set('skip', props.itemsPerPage * props.page);

      if (category) {
        productList = await fetchProductByCategory(category, urlParams.toString());
      } else {
        productList = await fetchProducts(urlParams.toString());
        props.setTotalItems(productList.total);
      }
      setAllProducts(productList.products);
    })();
  }, [category, props]);

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

  const fetchProductByCategory = async (category, params) => {
    setIsLoading(true);
    return await Instance.get(`${Routes.product.category}/${category}?${params}`)
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

  const onExport = () => {
    const ws = utils.json_to_sheet(products);
    const wb = utils.book_new();
    utils.book_append_sheet(wb, ws, 'Data');
    writeFile(wb, 'products.xlsx');
  };

  return isLoading ? (
    <div className="flex justify-center">Loading...</div>
  ) : (
    <>
      <div className="flex justify-between items-center my-2">
        <div>
          <input
            type="text"
            name="filterText"
            placeholder="search products"
            onChange={filterProductsByText}
            className="block w-full px-4 py-2 mt-2 text-purple-700 bg-white border rounded-md focus:border-purple-400 focus:ring-purple-300 focus:outline-none focus:ring focus:ring-opacity-40"
          />
        </div>
        <div className="flex items-center gap-1 sm:gap-5">
          {categories.length ? (
            <select
              name="category"
              defaultValue=""
              value={category}
              onChange={onCategoryChange}
              className="h-10 p-2 rounded-mg cursor-pointer"
            >
              <option value="">select category</option>
              {categories.map((cate) => (
                <option key={cate} name={cate} value={cate}>
                  {cate}
                </option>
              ))}
            </select>
          ) : null}
          <button
            type="button"
            className="bg-purple-700 text-white px-4 py-1 rounded hover:bg-purple-600 h-10"
            onClick={onExport}
          >
            export
          </button>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mb-10">
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
                <button
                  className="cursor-pointer bg-orange-700 text-white p-1 rounded-md text-sm hover:bg-orange-600"
                  onClick={() => handleAddToCart(idx)}
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default WithPagination(Products);
