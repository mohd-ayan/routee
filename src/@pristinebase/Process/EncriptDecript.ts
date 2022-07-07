export class EncriptDecript{
     encrypt(value: string): string {
        return btoa(value);
    }

    decrypt(value: string): string {
        return atob(value);
    }
}
