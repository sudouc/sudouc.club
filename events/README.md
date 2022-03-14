# Events

## Schema
```jsonc
{
    "start_date": "", // null for comming soon
    "end_date": "", // null only if start date null
    "title": "", // must be set
    "description": "", // must be set
    "location": "", // null for TBD
    "tagline": "", // null for auto gen
    "tag_name": "", // null for event
    "tag_color": "", // null for yellow
    "link": "#" // null if no link
}
```

Use something like [https://timestampgenerator.com/](https://timestampgenerator.com/) to generate the `x_date` timestamps (`RFC2822`)