export default interface DropdownAvatarProps {
    dataUser: {
        name: string | null;
        email: string | null;
        avatar: string | null;
        google_id?: string;
        role: string | null;
    };
}