import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/products";

export default function Products() {
  return (
    <section id="products" className="bg-slate-50 py-20 lg:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="max-w-2xl">
          <span className="text-sm font-semibold text-blue-600">
            Our Products
          </span>
          <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
            Powerful Solutions for a Smarter Tomorrow
          </h2>
          <p className="mt-4 text-base leading-relaxed text-slate-500">
            Explore our range of IoT products and features designed to help you
            stay connected, in control and ahead of the curve.
          </p>
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {products.map(
            ({ id, icon: Icon, iconBg, iconColor, title, description }) => (
              <div
                key={id}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-shadow hover:shadow-md"
              >
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconBg}`}
                >
                  <Icon size={22} className={iconColor} />
                </div>

                <h3 className="mt-5 text-lg font-semibold text-slate-900">
                  {title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  {description}
                </p>

                <Link
                  href={`/products/${id}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700"
                >
                  Learn More
                  <ArrowRight size={14} />
                </Link>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
