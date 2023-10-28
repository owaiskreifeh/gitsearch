'use server'
import { AppContainer } from "@/lib/appContainer";

export async function searchByUsername(username: string, page: number): Promise<any> {
    const response = await AppContainer.gitClient.searchByUsername(username, page);
    return response.serialize();
}

export async function searchByRepoName(repoName: string, page: number): Promise<any> {
    const response = await AppContainer.gitClient.searchByRepoName(repoName, page);
    return response.serialize();
}