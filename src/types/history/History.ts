import { Key } from "../key/Key";

export interface History {
  id: number;
  passId: string;
  key: Key;
  purpose: string;
  borrowTime: string;
  borrowPic: string;
  borrowSoc: string;
  returnTime: string;
  returnPic: string;
  returnSoc: string;
  status: "Active" | "Inactive";
}
