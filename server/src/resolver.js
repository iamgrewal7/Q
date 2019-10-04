var fs = require('fs');
var data = JSON.parse(fs.readFileSync('data.json', 'utf8'));

module.exports = {
    Query: {
        users: async () => {
            return data.users;
        },

        categories: async () => {
            return data.categories;
        },

        queue: async () => {
            return data.queue;
        }
    },

    Mutation: {
        addItem: async (_, args) => {
            const queueId = data["queue"].length + 1
            const userId = data["users"].length + 1
            const date = new Date() 
            const item = {
                "id": queueId,
                "user": {"name": args.name, "id": userId},
                "appendDate": date.getHours() + ":" + date.getMinutes()
            }
            data["queue"].push(item)
            data["users"].push({"name": args.name, "id": userId})
            var json = JSON.stringify(data)
            fs.writeFile('data.json', json, 'utf8', (err) => {
                if(err) console.log(err);
            });

            return {"id": id};
        },

        popItem: async(_, args) => {
            data["queue"].splice(data["queue"].findIndex(el => el.id === args.id), 1)
        }
    }
}