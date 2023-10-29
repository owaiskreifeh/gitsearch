import { createContext } from 'react'
import rootStore from './RootStore'

export const store = rootStore;
export const storeContext = createContext(rootStore)