import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui";
import { cn } from "@/lib/utils";

interface IBreadcrumb {
    pages: any[],
    stage: number,
    handleStage: (index: number) => void,
    className?: string
}

const BreadcrumbNavigation = ({ pages, stage, handleStage, className }: IBreadcrumb) => {
    return (
        <Breadcrumb className={cn("w-full flex items-center justify-center", className)}>
            <BreadcrumbList>
                {pages.sort((a, b) => a.stage - b.stage).map((link, index) => (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => { handleStage(link.stage) }} className={link.stage === stage ? "text-primary font-bold": ""}>{link.name}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {link.stage < pages.length - 1 && <BreadcrumbSeparator />}
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default BreadcrumbNavigation;