import React from 'react'
import { Wrapper, WrapperCategories, WrapperList } from './style'
import { faList} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ProductService from '../../services/ProductService';

const NavListComponent = () => {
  const {categories} = ProductService();
  const {getAllProduct} = ProductService();
  const handlesubmit = (e) => {
      const name = e.target.innerText;
      getAllProduct(name)
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