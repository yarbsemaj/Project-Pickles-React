const filters = {
    fields: {
        turnipPrice:{
            displayName: "Turnip Price",
            filters: ["==", ">", "<"]
        },
        maxQueue:{
            displayName: "Max Que",
            filters: ["==", ">", "<"]
        },
        queued:{
            displayName: "Que Lenght",
            filters: ["==", ">", "<"]
        },
        description:{
            displayName: "Description",
            filters: ["contains"]
        },
        fee:{
            displayName: "Fee",
            filters: ["is"],
            enum: {
                0:{
                    displayName: "free"
                },
                1:{
                    displayName: "not free"
                }
            }
        },
        islander:{
            displayName: "Islander",
            filters: ["is"],
            enum: {
                daisy:{
                    displayName: "Daisy"
                },
                celeste:{
                    displayName: "Celeste"
                }
            }
        },
        category:{
            displayName: "Category",
            filters: ["is"],
            enum: {
                turnips:{
                    displayName: "Turnips"
                },
                cataloging:{
                    displayName: "Cataloging"
                },
                crafting:{
                    displayName: "Crafting"
                },
                other:{
                    displayName: "Other"
                }
            }
        }
    },
    filters: {
        "==":{
            displayName: "is equal to"
        },
        ">":{
            displayName: "is greater than"
        },
        "<":{
            displayName: "is less than"
        },
        "contains":{
            displayName: "contains"
        },
        "is": {
            displayName: "is"
        }
    }
}
export default filters