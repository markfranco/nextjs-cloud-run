import React from 'react'
import { render } from './testUtils'
import Blog from '../pages/index'

describe('Home page', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<Blog countries={[]} feed={[]} />, {})
    expect(asFragment()).toMatchSnapshot()
  })
})
