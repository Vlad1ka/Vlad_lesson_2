import React from 'react';
import qs from 'qs';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Categories from '../components/Categories';
import Sort, {list} from '../components/Sort';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

 const Home = ( ) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage } = useSelector(state => state.filter);

    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems]=React.useState([]);
    const [isLoading, setIsLoading] = React.useState(true);

    const onChangeCategory = (id) => {
      dispatch(setCategoryId(id));
    };

    const onChangePage = number => {
      dispatch(setCurrentPage(number));
    };

    const fetchPizzas = () => {
      setIsLoading(true);

    const sortBy = sort.sortProperty.replace('-', '');
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : "";

    axios.get(`https://66f121e741537919154fa987.mockapi.io/Items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`)
    .then(res => {
      setItems(res.data);
      setIsLoading(false);
    });
    }

  // Если был первый рендер, то проверяем URL-параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = list.find(obj => obj.sortProperty == params.sortProperty);

      dispatch(
        setFilters({
          ...params,
          sort
        })
      );
      isSearch.current = true;
    }
  }, []);

  // Если был первый рендер, то запрашиваем пиццы
  React.useEffect(() => {
    window.scrollTo(0, 0);

    if(!isSearch.current) {
      fetchPizzas();
    }

    isSearch.current = false;

  },[categoryId, sort, searchValue, currentPage]);

  // Если изменили параметры и был первый рендер
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
  
      navigate(`?${queryString}`)
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  const pizzas = items.map((obj) => <PizzaBlock key={obj.id} {...obj}/>);

  const skeletons = [... new Array(6)].map((_, index) => (<Skeleton key={index} />));

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories 
          value={categoryId}
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">{isLoading ? skeletons : pizzas}</div>
        <Pagination currentPage={currentPage} onChangePage={onChangePage}/>
    </div>
  )
}

export default Home;