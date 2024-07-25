import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


const initialCategories

const schema = z.object({
    description: z.string().min(3, { message: "description must be at least 3 charachters" }),
    amount: z
      .number({ invalid_type_error: "Number field is required" })
        .min(0.01, { message: "amount shall be a numebr bigger than 0.01" }),
    category: z.array({"Utilities", "Groceries", "entertainment"})
  });