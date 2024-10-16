import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { TableData } from "@/components/TableData";

const eventsData = [
  {
    "id": 1,
    "title": "Spring Boot Workshop",
    "description": "Advanced workshop on Spring Boot",
    "date": "15-10-2023",
    "type": "WORKSHOP",
    "isArchived": false
  },
  {
    "id": 2,
    "title": "React Conference",
    "description": "Conference about React and frontend development",
    "date": "22-11-2023",
    "type": "CONFERENCE",
    "isArchived": false
  },
  {
    "id": 3,
    "title": "Java Meetup",
    "description": "Networking event for Java developers",
    "date": "01-12-2023",
    "type": "MEETUP",
    "isArchived": false
  },
  {
    "id": 4,
    "title": "Kotlin Webinar",
    "description": "Webinar about Kotlin for beginners",
    "date": "05-11-2023",
    "type": "WEBINAR",
    "isArchived": true
  },
  {
    "id": 5,
    "title": "Angular Workshop",
    "description": "Hands-on workshop about Angular",
    "date": "18-10-2023",
    "type": "WORKSHOP",
    "isArchived": false
  },
  {
    "id": 6,
    "title": "Cloud Native Summit",
    "description": "Conference focused on cloud-native technologies",
    "date": "12-12-2023",
    "type": "CONFERENCE",
    "isArchived": false
  },
  {
    "id": 7,
    "title": "DevOps Days",
    "description": "Event for DevOps enthusiasts",
    "date": "20-11-2023",
    "type": "MEETUP",
    "isArchived": true
  },
  {
    "id": 8,
    "title": "Microservices Architecture",
    "description": "Workshop on designing microservices",
    "date": "10-10-2023",
    "type": "WORKSHOP",
    "isArchived": false
  },
  {
    "id": 9,
    "title": "Python for Data Science",
    "description": "Introduction to Python in data science",
    "date": "28-12-2023",
    "type": "WEBINAR",
    "isArchived": false
  },
];

const columns: ColumnDef<typeof eventsData[0]>[] = [
  { accessorKey: 'id', header: 'ID' },
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'description', header: 'Description' },
  { accessorKey: 'date', header: 'Date' },
  { accessorKey: 'type', header: 'Type' },
  { accessorKey: 'isArchived', header: 'Archived', cell: info => info.getValue() ? 'Yes' : 'No' },
];

export const PageEvents = () => {
  return (
    <div>
      <h1>Events</h1>
      <TableData
        data={eventsData}
        columns={columns}
      />
    </div>
  );
};