import React from 'react'
import { Wrapper, WrapperCategories, WrapperIcon, WrapperList } from './style'

import { faArrowRight, faList} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const NavListComponent = () => {
  const handlesubmit = (e) => {
      const name = e.target.innerText;
      console.log(name)
  }
  return (
    <Wrapper>
      <WrapperCategories>
          <div><FontAwesomeIcon icon={faList} /></div>
          <p>Danh mục</p>
        </WrapperCategories>
      <WrapperList>
        <ul>
              <li onClick={handlesubmit}><WrapperIcon icon={faArrowRight} /> afsddnsfssfsdfosdoiifjdjfoijofssdfssdf</li>
              <li onClick={handlesubmit}><WrapperIcon icon={faArrowRight} /> Rtx</li>
              <li onClick={handlesubmit}><WrapperIcon icon={faArrowRight} /> Ban phim</li>
              <li onClick={handlesubmit}><WrapperIcon icon={faArrowRight} /> tan nhiet</li>
              <li onClick={handlesubmit}><WrapperIcon icon={faArrowRight} /> man hinh</li>
          </ul>
      </WrapperList>
    </Wrapper>
  )
}

export default NavListComponent