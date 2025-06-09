import {
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
} from "@/components/ui/toast"

function CompareAddWarning({ warningAlert, setWarningAlert }) {
    return (
        <Toast open={warningAlert} onOpenChange={setWarningAlert}>
            <div className="grid gap-1">
                <ToastTitle>Warning</ToastTitle>
                <ToastDescription>Add one more superhero!</ToastDescription>
            </div>
            <ToastClose />
        </Toast>
    )
}

export default CompareAddWarning