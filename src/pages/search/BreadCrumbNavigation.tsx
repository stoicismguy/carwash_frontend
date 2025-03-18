import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui";
import { cn } from "@/lib/utils";

interface IBreadcrumb {
    navLinks: string[],
    stage: number,
    setStage: any,
    className?: string
}

const BreadcrumbNavigation = ({ navLinks, stage, setStage, className }: IBreadcrumb) => {
    return (
        <Breadcrumb className={cn("w-full flex items-center justify-center", className)}>
            <BreadcrumbList>
                {navLinks.map((link, index) => (
                    <>
                        <BreadcrumbItem>
                            <BreadcrumbLink onClick={() => { if (index < stage) setStage(index)}} className={index === stage ? "text-primary font-bold": ""}>{link}</BreadcrumbLink>
                        </BreadcrumbItem>
                        {index < navLinks.length - 1 && <BreadcrumbSeparator />}
                    </>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
}

export default BreadcrumbNavigation;