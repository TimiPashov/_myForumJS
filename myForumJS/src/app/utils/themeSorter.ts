import { Theme } from "../types/theme";


export function mySort(themes: Theme[], criteria: string) {
    
    switch (criteria) {
        case 'Date':
            return themes.sort((a: { created_at: string }, b: { created_at: string }) => {
                return (new Date(b.created_at) as any) - (new Date(a.created_at) as any);
            });

        case 'Activity':
            return themes.sort((a, b) => {
                return b.posts.length - a.posts.length;
            });
        case 'Subscribers':
            return themes.sort((a, b) => {
                return b.subscribers.length - a.subscribers.length;
            });
        case 'Name':
            return themes.sort((a, b) => {
                return a.themeName.localeCompare(b.themeName);
            });
        default:
            return themes
    }
}