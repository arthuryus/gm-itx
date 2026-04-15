//import { useMetadata } from "@/shared/hooks/use-metadata.ts"
import ProfileUpdateForm from "@/features/account/ui/ProfileUpdateForm"
import EmailUpdateForm from "@/features/account/ui/EmailUpdateForm"
import PasswordUpdateForm from "@/features/account/ui/PasswordUpdateForm"

export default function ProfilePage() {
    //const h1 = useMetadata().h1

    return (
        <div className="space-y-6">
            <ProfileUpdateForm />
            <EmailUpdateForm />
            <PasswordUpdateForm />
        </div>
    )
}