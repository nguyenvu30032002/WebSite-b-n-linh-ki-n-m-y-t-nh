import React from 'react'
import { Wrapper, WrapperCategories, WrapperList } from './style'
import { faList} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductService from '../../services/ProductService';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../../store/Action';

const NavListComponent = () => {
  const {categories} = ProductService();
  const dispatch = useDispatch();
  const handlesubmit = (e) => {
      const name = e.target.innerText;
      dispatch(setSearchTerm(name));
  }
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