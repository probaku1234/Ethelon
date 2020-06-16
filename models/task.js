class Task {
    constructor(id, title, description, location, numberOfVolunteer, startTime, dueDate, volunteers, event) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.numberOfVolunteer = numberOfVolunteer;
        this.startTime = new Date(startTime);
        this.dueDate = new Date(dueDate);
        this.volunteers = volunteers;
        this.event= event; // event id
    }
}

export default Task;