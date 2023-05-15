import { useEffect, useState } from "react";
import { Category, SubCategory } from "../shared/categories";
import { remult } from "remult";

export default function Home() {
  const [categories, setCategories] = useState<
    {
      category: Category;
      sub: SubCategory[];
    }[]
  >();

  useEffect(() => {
    remult
      .repo(Category)
      .find()
      .then(async (categories) => {
        setCategories(
          await Promise.all(
            categories.map(async (category) => ({
              category,
              sub: await remult.repo(SubCategory).find({ where: { category } }),
            }))
          )
        );
      });
  }, []);

  return (
    <div>
      <h1>categories</h1>
      <ul>
        {categories?.map((c) => (
          <li key={c.category.id}>
            {c.category.name}
            <ul>
              {c.sub.map((sub) => (
                <li key={sub.id}>{sub.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}
