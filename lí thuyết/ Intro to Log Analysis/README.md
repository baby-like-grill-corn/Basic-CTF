# Log Analysis Basics

Among the various data sources collected and utilized by infrastructure systems, logs are pivotal in offering valuable insights into these systems' inner workings and interactions across the network. A log is a stream of time-sequenced messages that record occurring events. Log analysis is the process of making sense of the events captured in the logs to paint a clear picture of what has happened across the infrastructure.

## What Are Logs?

Logs are recorded events or transactions within a system, device, or application. Specifically, these events can be related to application errors, system faults, audited user actions, resource uses, network connections, and more. Each log entry contains relevant details to contextualize the event, such as its timestamp (the date and time it occurred), the source (the system that generated the log), and additional information about the specific log event.

```
Jul 28 17:45:02 10.10.0.4 FW-1: %WARNING% general: Unusual network activity detected from IP 10.10.0.15 to IP 203.0.113.25. Source Zone: Internal, Destination Zone: External, Application: web-browsing, Action: Alert.
```

In the above example, this log entry signifies an event detected by a firewall regarding unusual network activity from an internal system, indicating a potential security concern. The relevant fields to consider in this example are:

Jul 28 17:45:02 - This timestamp shows the event's date and time.

10.10.0.4 - This refers to the system's IP address (the source) that generated the log.

%WARNING% - This indicates the severity of the log, in this case, Warning. Log entries are often given a severity level to categorize and communicate their relative importance or impact. These severity levels help prioritize responses, investigations, and actions based on the criticality of the events. Different systems might use slightly different severity levels, but commonly, you can expect to find the following increasing severity levels: Informational, Warning, Error, and Critical.

Action: Alert - In this case, the firewall's policy was configured to notify when such unusual activity occurs.

The remaining fields give us specific information related to the logged event. Specifically, that unusual network activity was detected from IP 10.10.0.15 to IP 203.0.113.25. Based on the Source Zone field, the traffic appears destined for the Internet (External), and the Application was categorized as web-browsing.

## Why Are Logs Important?

There are several reasons why collecting logs and adopting an effective log analysis strategy is vital for an organization's ongoing operations. Some of the most common activities include:

1. System Troubleshooting: Analyzing system errors and warning logs helps IT teams understand and quickly respond to system failures, minimizing downtime, and improving overall system reliability.
2. Cyber Security Incidents: In the security context, logs are crucial in detecting and responding to security incidents. Firewall logs, intrusion detection system (IDS) logs, and system authentication logs, for example, contain vital information about potential threats and suspicious activities. Performing log analysis helps SOC teams and Security Analysts identify and quickly respond to unauthorized access attempts, malware, data breaches, and other malicious activities.
3. Threat Hunting: On the proactive side, cyber security teams can use collected logs to actively search for advanced threats that may have evaded traditional security measures. Security Analysts and Threat Hunters can analyze logs to look for unusual patterns, anomalies, and indicators of compromise (IOCs) that might indicate the presence of a threat actor.
4. Compliance: Organizations must often maintain detailed records of their system's activities for regulatory and compliance purposes. Regular log analysis ensures that organizations can provide accurate reports and demonstrate compliance with regulations such as GDPR, HIPAA, or PCI DSS.

## Types of Logs

As discussed in the Intro to Logs room, different components within a computing environment generate various types of logs, each serving a distinct purpose. These log types include, but are not limited to:

1. Application Logs: Messages from specific applications, providing insights into their status, errors, warnings, and other operational details.
2. Audit Logs: Events, actions, and changes occurring within a system or application, providing a history of user activities and system behavior.
3. Security Logs: Security-related events like logins, permission alterations, firewall activities, and other actions impacting system security.
4. Server Logs: System logs, event logs, error logs, and access logs, each offering distinct information about server operations.
5. System Logs: Kernel activities, system errors, boot sequences, and hardware status, aiding in diagnosing system issues.
6. Network Logs: Communication and activity within a network, capturing information about events, connections, and data transfers.
7. Database Logs: Activities within a database system, such as queries performed, actions, and updates.
Web Server Logs: Requests processed by web servers, including URLs, source IP addresses, request types, response codes, and more.
Each log type presents a unique perspective on the activities within an environment, and analyzing these logs in context to one another is crucial for effective cyber security investigation and threat detection.





