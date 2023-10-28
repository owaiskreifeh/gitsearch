'use server'
import { AppContainer } from "@/lib/appContainer";

export async function searchByUsername(username: string, page: number): Promise<any> {
    const response = await AppContainer.gitClient.searchByUsername(username);
    return response.serialize();
}