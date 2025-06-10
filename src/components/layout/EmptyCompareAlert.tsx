import {
    Toast,
    ToastTitle,
    ToastDescription,
    ToastClose,
} from "@/components/ui/toast"

function EmptyCompareAlert({ open, setOpen }) {
    return (
        <Toast open={open} onOpenChange={setOpen}>
            <div className="grid gap-1">
                <ToastTitle>Error</ToastTitle>
                <ToastDescription>Compare list is empty!</ToastDescription>
            </div>
            <ToastClose />
        </Toast>
    )
}

export default EmptyCompareAlert