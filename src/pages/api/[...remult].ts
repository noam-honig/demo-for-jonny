import { remultNext } from "remult/remult-next";
import { Category, SubCategory, seed } from "../../shared/categories";

export default remultNext({
  entities: [Category, SubCategory],
  initApi: async () => {
    seed();
  },
});
