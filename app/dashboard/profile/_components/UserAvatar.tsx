import { Avatar, AvatarBadge, AvatarImage } from "@/components/ui/avatar"

type Props = {
    emailVerified?: boolean,
    avatarImage?: string 
}

function UserAvatar({ emailVerified, avatarImage  }: Props) {

    

    return (
        <Avatar size="lg">
            <AvatarImage src={!avatarImage ? 'https://github.com/shadcn.png' : avatarImage} />
            <AvatarBadge className={emailVerified ? 'bg-green-600 dark:bg-green-800' : 'bg-red-600 dark:bg-red-800'} />
        </Avatar>
    )
}

export default UserAvatar