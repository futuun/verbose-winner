import configureStore from './configureStore.prod'

test('configureStore: initialize store', () => {
  expect(configureStore()).toMatchSnapshot()
})
