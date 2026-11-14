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

# Investigation Theory

Several methodologies, best practices, and essential techniques are employed to create a coherent timeline and conduct effective log analysis investigations.

## Timeline

When conducting log analysis, creating a timeline is a fundamental aspect of understanding the sequence of events within systems, devices, and applications. At a high level, a timeline is a chronological representation of the logged events, ordered based on their occurrence. The ability to visualize a timeline is a powerful tool for contextualizing and comprehending the events that occurred over a specific period.

Within incident response scenarios, timelines play a crucial role in reconstructing security incidents. With an effective timeline, security analysts can trace the sequence of events leading up to an incident, allowing them to identify the initial point of compromise and understand the attacker's tactics, techniques and procedures (TTPs).

## Timestamp
In most cases, logs will typically include timestamps that record when an event occurred. With the potential of many distributed devices, applications, and systems generating individual log events across various regions, it's crucial to consider each log's time zone and format. Converting timestamps to a consistent time zone is necessary for accurate log analysis and correlation across different log sources.

Many log monitoring solutions solve this issue through timezone detection and automatic configuration. Splunk, for example, automatically detects and processes time zones when data is indexed and searched. Regardless of how time is specified in individual log events, timestamps are converted to UNIX time and stored in the _time field when indexed.

This consistent timestamp can then be converted to a local timezone during visualization, which makes reporting and analysis more efficient. This strategy ensures that analysts can conduct accurate investigations and gain valuable insights from their log data without manual intervention.

## Super Timelines

A super timeline, also known as a consolidated timeline, is a powerful concept in log analysis and digital forensics. Super timelines provide a comprehensive view of events across different systems, devices, and applications, allowing analysts to understand the sequence of events holistically. This is particularly useful for investigating security incidents involving multiple components or systems.

Super timelines often include data from previously discussed log sources, such as system logs, application logs, network traffic logs, firewall logs, and more. By combining these disparate sources into a single timeline, analysts can identify correlations and patterns that need to be apparent when analyzing logs individually.

Creating a consolidated timeline with all this information manually would take time and effort. Not only would you have to record timestamps for every file on the system, but you would also need to understand the data storage methods of every application. Fortunately, Plaso (Python Log2Timeline) is an open-source tool created by Kristinn Gudjonsson and many contributors that automates the creation of timelines from various log sources. It's specifically designed for digital forensics and log analysis and can parse and process log data from a wide range of sources to create a unified, chronological timeline.

To learn more about Plaso and its capabilities, visit the official documentation page here.

## Data Visualization

Data visualization tools, such as Kibana (of the Elastic Stack) and Splunk, help to convert raw log data into interactive and insightful visual representations through a user interface. Tools like these enable security analysts to understand the indexed data by visualizing patterns and anomalies, often in a graphical view. Multiple visualizations, metrics, and graphic elements can be constructed into a tailored dashboard view, allowing for a comprehensive "single pane of glass" view for log analysis operations.

<img width="1999" height="1125" alt="caeace06b70e4c6920d32ae0bf22e8f4" src="https://github.com/user-attachments/assets/c568a305-6fb7-4538-a5e0-d358a707243b" />

To create effective log visualizations, it's essential first to understand the data (and sources) being collected and define clear objectives for visualization.

For example, suppose the objective is to monitor and detect patterns of increased failed login attempts. In that case, we should look to visualize logs that audit login attempts from an authentication server or user device. A good solution would be to create a line chart that displays the trend of failed login attempts over time. To manage the density of captured data, we can filter the visualization to show the past seven days. That would give us a good starting point to visualize increased failed attempts and spot anomalies.

## Log Monitoring and Alerting

In addition to visualization, implementing effective log monitoring and alerting allows security teams to proactively identify threats and immediately respond when an alert is generated.

Many SIEM solutions (like Splunk and the Elastic Stack) allow the creation of custom alerts based on metrics obtained in log events. Events worth creating alerts for may include multiple failed login attempts, privilege escalation, access to sensitive files, or other indicators of potential security breaches. Alerts ensure that security teams are promptly notified of suspicious activities that require immediate attention.

Roles and responsibilities should be defined for escalation and notification procedures during various stages of the incident response process. Escalation procedures ensure that incidents are addressed promptly and that the right personnel are informed at each severity level.

For a hands-on walkthrough on dashboards and alerting within Splunk, it is recommended to check out the Splunk: Dashboards and Reports room!

## External Research and Threat Intel

Identifying what may be of interest to us in log analysis is essential. It is challenging to analyze a log if we're not entirely sure what we are looking for.

First, let's understand what threat intelligence is. In summary, threat intelligence are pieces of information that can be attributed to a malicious actor. Examples of threat intelligence include:

1. IP Addresses
2. File Hashes
3. Domains

When analyzing a log file, we can search for the presence of threat intelligence. For example, take this Apache2 web server entry below. We can see that an IP address has tried to access our site's admin panel.

```
cmnatic@thm cat access.log
54.36.149.64 - - [25/Aug/2023:00:05:36 +0000] "GET /admin HTTP/1.1" 200 8260 "-" "Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot/)"
191.96.106.80 - - [25/Aug/2023:00:33:11 +0000] "GET /TryHackMe/rooms/docker-rodeo/dockerregistry/catalog1.png HTTP/1.1" 200 19594 "https://tryhackme.com/" "Mozi>
54.36.148.244 - - [25/Aug/2023:00:34:46 +0000] "GET /TryHackMe/?C=D;O=D HTTP/1.1" 200 5879 "-" "Mozilla/5.0 (compatible; AhrefsBot/7.0; +http://ahrefs.com/robot>
66.249.66.68 - - [25/Aug/2023:00:35:53 +0000] "GET /TryHackMe%20Designs/ HTTP/1.1" 200 5973 "-" "Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) 200 19594 "https://tryhackme.com/" "Mozi>
```

Using a threat intelligence feed like ThreatFox, we can search our log files for known malicious actors' presence.

<img width="2564" height="1150" alt="c3ad6571c689577d907026d8a75d73c7" src="https://github.com/user-attachments/assets/35f74411-79d3-4c8e-878a-e180077a2a89" />

```
cmnatic@thm grep "54.36.149.64" logfile.txt
54.36.149.64
```

# Detection Engineering

## Common Log File Locations

A crucial aspect of log analysis is understanding where to locate log files generated by various applications and systems. While log file paths can vary due to system configurations, software versions, and custom settings, knowing common log file locations is essential for efficient investigation and threat detection.

- **Web Servers:**
  - **Nginx:**
    - Access Logs: `/var/log/nginx/access.log`
    - Error Logs: `/var/log/nginx/error.log`

  - **Apache:**
    - Access Logs: `/var/log/apache2/access.log`
    - Error Logs: `/var/log/apache2/error.log`

- **Databases:**
  - **MySQL:**
    - Error Logs: `/var/log/mysql/error.log`

  - **PostgreSQL:**
    - Error and Activity Logs: `/var/log/postgresql/postgresql-{version}-main.log`

- **Web Applications:**
  - **PHP:**
    - Error Logs: `/var/log/php/error.log`

- **Operating Systems:**
  - **Linux:**
    - General System Logs: `/var/log/syslog`
    - Authentication Logs: `/var/log/auth.log`

- **Firewalls and IDS/IPS:**
  - **iptables:**
    - Firewall Logs: `/var/log/iptables.log`

  - **Snort:**
    - Snort Logs: `/var/log/snort/`

While these are common log file paths, it's important to note that actual paths may differ based on system configurations, software versions, and custom settings. It's recommended to consult the official documentation or configuration files to verify the correct log file paths to ensure accurate analysis and investigation.































