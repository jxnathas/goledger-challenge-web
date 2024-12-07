import Image from "next/image";
import brand from "@/assets/brand.svg";

export default function HeaderBrand() {
    return (
        <div className="flex justify-center pt-20 pb-16">
            <Image src={brand} alt="logo" width={50} height={50} />
        </div>
    );
}   