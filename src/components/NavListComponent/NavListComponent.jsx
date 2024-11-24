import React, { useCallback, useEffect, useState } from 'react'
import { Wrapper, WrapperCategories, WrapperList } from './style'
import { faList} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductService from '../../services/ProductService';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../store/Action';

const NavListComponent = () => {
  const { getAllCategories} = ProductService();
  const [categories, setCategories] = useState([])
  const dispatch = useDispatch();
  const handlesubmit = (e) => {
      const name = e.target.innerText;
      dispatch(setSearchTerm(name));
  }

  const fetchCategories = useCallback(async() => {
    try{
        const categories = await getAllCategories()
        setCategories(categories)
    }
    catch(error){
        throw error
    }
},[getAllCategories])

  useEffect(() => {
    fetchCategories()
  },[fetchCategories]) 
  return (
    <Wrapper>
      <WrapperCategories>
          <div><FontAwesomeIcon icon={faList} /></div>
          <p>Danh mục</p>
        </WrapperCategories>
      <WrapperList>
        <ul>
        {
           categories.map(category => (
            <li key={category.id} onClick={handlesubmit}>
              <span>{category.name}</span>
            </li>
          ))
        }
          </ul>
      </WrapperList>
    </Wrapper>
  )
}

export default NavListComponent