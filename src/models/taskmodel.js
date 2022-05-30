import {Model, Collection} from 'vue-mc'

/**
 * Task model
 */
class Task extends Model {

    // Default attributes that define the "empty" state.
    defaults() {
        return {
            title: '',
            description: '',
            keyWords: [String],
            date: { type:Date, default: Date.now },
            priority: null,
            motiv: false,
            meta: {
                isDelayed: false,
                isDaily: true,
                countRep: 0
            },
            id: null,
            done: false,
        }
    }

    // Attribute mutations.
    mutations() {
        return {
            title: String,
            description: String,
            keyWords: [String],
            date: { type:Date, default: Date.now },
            priority: Number,
            motiv: Boolean,
            meta: {
                isDelayed: Boolean,
                isDaily: Boolean,
                countRep: Number
            },
            id:   (id) => Number(id) || null,
            done: Boolean,
        }
    }

    // Attribute validation
    validation() {
        return {
            id:   integer.and(min(1)).or(equal(null)),
            title: string.and(required),
            done: boolean,
        }
    }

    // Route configuration
    routes() {
        return {
            fetch: '/api/tareas/{id}',
            save:  '/api/tareas',
        }
    }
}

/**
 * Task collection
 */
class TaskList extends Collection {

    // Model that is contained in this collection.
    model() {
        return Task;
    }

    // Default attributes
    defaults() {
        return {
            orderBy: 'name',
        }
    }

    // Route configuration
    routes() {
        return {
            fetch: '/tasks',
        }
    }
    // Number of tasks to be completed.
    get todo() {
        return this.sum('done');
    }

    // Will be `true` if all tasks have been completed.
    get done() {
        return this.todo == 0;
    }
}

export default {
    Task, TaskList
}