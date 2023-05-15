import { describeClass, Entity, Fields, Field, remult } from "remult";

export class Category {
  id = "";
  name = "";
  enable = false;
}
describeClass(Category, Entity("categories"), {
  id: Fields.cuid(),
  name: Fields.string(),
  enable: Fields.boolean(),
});

export class SubCategory {
  id = "";
  name = "";
  enable = false;
  category?: Category;
}
describeClass(SubCategory, Entity("subCategories"), {
  id: Fields.cuid(),
  name: Fields.string(),
  enable: Fields.boolean(),
  category: Field(() => Category),
});

export async function seed() {
  const catRepo = remult.repo(Category);
  const subCatRepo = remult.repo(SubCategory);
  if ((await catRepo.count()) === 0) {
    //delete all sub categories
    for (const s of await subCatRepo.find()) {
      await subCatRepo.delete(s);
    }

    const [shirts, pants] = await catRepo.insert([
      { name: "shirts" },
      { name: "pants" },
    ]);
    await remult.repo(SubCategory).insert([
      { name: "long shirts", category: shirts },
      { name: "short shirts", category: shirts },
      { name: "long pants", category: pants },
      { name: "short pants", category: pants },
    ]);
  }
}
