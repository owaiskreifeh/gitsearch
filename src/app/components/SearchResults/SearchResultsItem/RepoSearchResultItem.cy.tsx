import React from 'react'
import { RepoSearchResultItem } from './RepoSearchResultItem'
import { GitRepo } from '@/lib/Model/GitRepoModel'


const mockRepo = GitRepo.deserialize({
  "id": 61825895,
  "name": "rednaga/APKiD",
  "owner": {
    "id": 10507639,
    "name": "rednaga",
    "profileUrl": "https://github.com/rednaga",
    "avatarUrl": "https://avatars.githubusercontent.com/u/10507639?v=4"
  },
  "contentUrl": "https://api.github.com/repos/rednaga/APKiD/contents/{+path}",
  "forksUrl": "https://api.github.com/repos/rednaga/APKiD/forks",
  "forksCount": 295,
  "watchersCount": 1758,
  "topics": [
    "android",
    "android-protect-apps",
    "android-protection",
    "antivirus",
    "appshielding",
    "machine-learning",
    "malware-analysis",
    "malware-detection",
    "malware-research",
    "packers",
    "rasp",
    "yara",
    "yara-forensics"
  ],
  "url": "https://api.github.com/repos/rednaga/APKiD",
  "description": "Android Application Identifier for Packers, Protectors, Obfuscators and Oddities - PEiD for Android"
})

describe('<RepoSearchResultItem />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<RepoSearchResultItem  {...mockRepo} serialize={() => { }} />)
  })
})