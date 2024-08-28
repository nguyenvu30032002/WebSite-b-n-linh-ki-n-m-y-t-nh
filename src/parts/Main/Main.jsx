import React from 'react'
import { Wrapper } from './style'
import NavComponent from '../../components/NavComponent/NavComponent'
import ArticleComponent from '../../components/ArticleComponent/ArticleComponent'

const Main = () => {
  return (
    <Wrapper>
      <NavComponent/>
      <ArticleComponent/>
    </Wrapper>
  )
}

export default Main