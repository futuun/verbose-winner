import React from 'react'
import renderer from 'react-test-renderer'
import Folk from './Folk'

for (let i = 0; i < 12; i++) {
  test(`Folk: ${i} letter${i === 1 ? '' : 's'}`, () => {
    const component = renderer.create(
      <Folk missedLetters={Array(i).fill('x')} />
    )
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
}
