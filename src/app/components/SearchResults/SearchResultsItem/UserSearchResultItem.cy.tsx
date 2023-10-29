import React from 'react'
import { UserSearchResultItem } from './UserSearchResultItem'
import { GitUser } from '@/lib/Model/GitUserModel'

const mockUser = GitUser.deserialize({
  "id": 10507639,
  "name": "rednaga",
  "profileUrl": "https://github.com/rednaga",
  "avatarUrl": "https://avatars.githubusercontent.com/u/10507639?v=4"
})
describe('<UserSearchResultItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<UserSearchResultItem  {...mockUser} serialize={() => {}}/>)
  })
})