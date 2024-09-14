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
              <li onClick={handlesubmit}><WrapperIcon icon={faArrowRight} /> <span>afsddnsfssfsdfosdoiifjdjfoijofssdfssdf</span></li>
              <li onClick={handlesubmit}><WrapperIcon icon={faArrowRight} /> <span>Rtx</span></li>
              <li onClick={handlesubmit}><WrapperIcon icon={faArrowRight} /> <span>Ban phim</span></li>
              <li onClick={handlesubmit}><WrapperIcon icon={faArrowRight} /> <span>tan nhiet</span></li>
              <li onClick={handlesubmit}><WrapperIcon icon={faArrowRight} /> <span>man hinh</span></li>
          </ul>
      </WrapperList>
    </Wrapper>
  )
}

export default NavListComponent