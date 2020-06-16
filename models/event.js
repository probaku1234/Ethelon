class Event {
    constructor(id, title, description, location, numberOfVolunteer, tasks, startTime, dueDate, volunteers) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.location = location;
        this.numberOfVolunteer = numberOfVolunteer;
        this.tasks = tasks;
        this.startTime = new Date(startTime);
        this.dueDate = new Date(dueDate);
        this.volunteers = volunteers;
    }
}

export default Event;