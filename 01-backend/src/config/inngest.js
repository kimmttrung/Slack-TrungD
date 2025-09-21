import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import { User } from '../models/user.model.js';
import { deleteSreamUser, upsertStreamUser } from "./stream.js";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "slack-clone" });
const syscUser = inngest.createFunction(
    { id: "sysc-user" },
    { event: "clerk/user.created" },
    async ({ event }) => {
        await connectDB();
        const { id, email_addresses, first_name, last_name, image_url } = event.data;

        const newUser = {
            clerkId: id,
            email: email_addresses[0]?.email_address,
            name: `${first_name || ""} ${last_name || ""}`,
            image: image_url,
        };

        await User.create(newUser);

        // To do some thing
        await upsertStreamUser({
            id: newUser.clerkId.toString(),
            name: newUser.name,
            image: newUser.image,
        });
    }
);
const deleteUserFromDB = inngest.createFunction(
    { id: "delete-user-from-do" },
    { event: "clerk/user.deleted" },
    async ({ event }) => {
        await connectDB();
        const { id } = event.data;
        await User.deleteOne({ clerkId: id });
        await deleteSreamUser(id.toString());
    }
)

// Create an empty array where we'll export future Inngest functions
export const functions = [syscUser, deleteUserFromDB];