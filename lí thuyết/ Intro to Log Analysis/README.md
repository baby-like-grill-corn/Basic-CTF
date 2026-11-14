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

# Automated vs. Manual Analysis

## Automated Analysis

Automated analysis involves the use of tools. For example, these often include commercial tools such as XPLG or SolarWinds Loggly. Automated analysis tools allow for processing and data analysis of logs. These tools often utilize Artificial Intelligence / Machine Learning to analyze patterns and trends. As the AI landscape evolves, we expect to see more effective automated analysis solutions.

| Advantages | Disadvantages |
| :--- | :--- |
| Saves time by performing a lot of the manual work required in manual analysis | Automated analysis tools are usually commercial-only and, therefore, expensive. |
| The use of artificial intelligence is effective at recognizing patterns and trends. | The effectiveness of artificial intelligence depends on how capable the model is. For example, the risk of false positives increases, or newer or never-seen-before events can be missed as the AI is not trained to recognize these. |

## Phân tích thủ công

Manual analysis is the process of examining data and artifacts without using automation tools. For example, an analyst scrolling through a web server log would be considered manual analysis. Manual analysis is essential for an analyst because automation tools cannot be relied upon.

| Advantages | Disadvantages |
| :--- | :--- |
| It is cheap and does not require expensive tooling. For example, simple Linux commands can do the trick. | It is time-consuming as the analyst has to do all of the work, including reformatting log files. |
| Allows for a thorough investigation. | N/A |
| Reduces the risk of overfitting or false positives on alerts from automated tools. | Events or alerts can be missed! Especially if there is a lot of data to comb through. |
| Allows for contextual analysis. The analyst has a broader understanding of the organization and cyber security landscape. | N/A |

# Log Analysis Tools: Command Line

When analyzin

When analyzing collected logs, sometimes the most readily available tool we have is the command line itself. Analyzing logs through the command line provides a quick and powerful way to gain insights into system activities, troubleshoot issues, and detect security incidents, even if we don't have an SIEM system configured.

Many built-in Linux commands allow us to parse and filter relevant information quickly. Viewing log files using the command line is one of the most basic yet essential tasks for conducting log analysis. Several common built-in tools are used for this purpose, offering differing functionalities to read and navigate through log files efficiently.

You can locate the apache.log file on the AttackBox under /root/Rooms/introloganalysis/task6 to follow along with this task. However, it is also attached to this task and available for download.

## cat

The cat command (short for "concatenate") is a simple utility that reads one or more files and displays its content in the terminal. When used for log files, it prints the entire log content to the screen.

For example, to view the contents of a log file named apache.log, you can use the command

```
user@tryhackme$ cat apache.log        
203.0.113.42 - - [31/Jul/2023:12:34:56 +0000] "GET /index.php HTTP/1.1" 200 1234 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36"
120.54.86.23 - - [31/Jul/2023:12:34:57 +0000] "GET /contact.php HTTP/1.1" 404 5678 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
185.76.230.45 - - [31/Jul/2023:12:34:58 +0000] "GET /about.php HTTP/1.1" 200 9876 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.164 Safari/537.36"
201.39.104.77 - - [31/Jul/2023:12:34:59 +0000] "GET /login.php HTTP/1.1" 200 4321 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36"
...
```        

Due to its large output, it is typically not the best approach for dealing with long log files.

## less

The less command is an improvement over cat when dealing with larger files. It allows you to view the file's data page by page, providing a more convenient way to read through lengthy logs. When using less to open a file, it displays the first page by default, and you can scroll down using the arrow keys or with Page Up and Page Down.

For example, to view the same log file using less, use the command:
```
user@tryhackme$ less apache.log       
...
...
HTTP/1.1" 200 7890 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.350 Safari/5>
P/1.1" 404 4321 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.3>
TTP/1.1" 200 1234 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.90 Safari/537>
P/1.1" 200 5678 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.3>
TTP/1.1" 404 5678 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537>
P/1.1" 200 1234 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 Safari/537.3>
TP/1.1" 200 5678 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.90 Safari/537.>
~
~
~
~
(END) 
```
You can exit the command's output via the q key.

## tail

The tail command is specifically designed for viewing the end of files and is very useful for seeing a summary of recently generated events in the case of log files. The most common use of tail is coupled with the -f option, which allows you to "follow" the log file in real-time, as it continuously updates the terminal with new log entries as they are generated and written. This is extremely useful when monitoring logs for live events or real-time system behavior.

By default, tail will only display the last ten lines of the file. However, we can change this with the -n option and specify the number of lines we want to view.

For example, if we only wanted to print the last five lines of the apache.log file and "follow" the logs in real-time, we can use the command:
```
user@tryhackme$ tail -f -n 5 apache.log
176.145.201.99 - - [31/Jul/2023:12:34:24 +0000] "GET /login.php HTTP/1.1" 200 1234 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.90 Safari/537.36"
104.76.29.88 - - [31/Jul/2023:12:34:23 +0000] "GET /index.php HTTP/1.1" 200 5678 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
128.45.76.66 - - [31/Jul/2023:12:34:22 +0000] "GET /contact.php HTTP/1.1" 404 5678 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.54 Safari/537.36"
76.89.54.221 - - [31/Jul/2023:12:34:21 +0000] "GET /about.php HTTP/1.1" 200 1234 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 Safari/537.36"
145.76.33.201 - - [31/Jul/2023:12:34:20 +0000] "GET /login.php HTTP/1.1" 200 5678 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.90 Safari/537.36"
```
Being able to sort, filter, and manipulate log files from the command line is a crucial aspect of performing effective log analysis. Analysts often need to extract specific information, filter out relevant data, aggregate results, and transform logs to uncover insights and identify anomalies.

Note: The opposite of the tail command is head, which allows you to view the first ten lines of a file by default and takes in the same arguments. Feel free to experiment with this as well!

## wc

The wc (word count) command is a simple but powerful utility that can be quite useful for quick analysis and statistics gathering. The output of wc provides information about the number of lines, words, and characters in a log file. This can help security analysts understand the size and volume of log data they are dealing with before diving into a more detailed analysis.


wc Example
```
user@tryhackme$ wc apache.log     
70  1562 14305 apache.log
        
```
After running wc on apache.log, we can determine that the file contains 70 lines, 1562 individual words (separated by whitespace), and 14305 individual characters.

## cut

The cut command extracts specific columns (fields) from files based on specified delimiters. This is a handy command for working with log files that have structured or tab-separated data.

If we want to extract all of the IP addresses in the file, we can use the cut command to specify a delimiter of a space character and only select the first field returned.
```
\user@tryhackme$ cut -d ' ' -f 1 apache.log
203.0.113.42
120.54.86.23
185.76.230.45
201.39.104.77
112.76.89.56
211.87.186.35
156.98.34.12
202.176.73.99
122.65.187.55
77.188.103.244
189.76.230.44
153.47.106.221
200.89.134.22
...
...
```
The above command will return a list of every IP address in the log file. Expanding on this, we can change the field number to -f 7 to extract the URLs and -f 9 to extract the HTTP status codes.

## sort

Sometimes, it's helpful to sort the returned entries chronologically or alphabetically. The sort command arranges the data in files in ascending or descending order based on specific criteria. This can be crucial for identifying patterns, trends, or outliers in our log data. It is also common to combine the output of another command (cut, for example) and use it as the input of the sort command using the pipe | redirection character.

For example, to sort the list of returned IP addresses from the above cut command, we can run:
```
user@tryhackme$ cut -d ' ' -f 1 apache.log | sort -n
76.89.54.221
76.89.54.221
76.89.54.221
76.89.54.221
76.89.54.221
76.89.54.221
77.188.103.244
99.76.122.65
104.76.29.88
104.76.29.88
104.76.29.88
104.76.29.88
104.76.29.88
104.76.29.88
...
...  
```
In the above command, we piped the output from cut into the sort command and added the -n option to sort numerically. This changed the output to list the IP addresses in ascending order.

If we want to reverse the order, we can add the -r option:

```
user@tryhackme$ cut -d ' ' -f 1 apache.log | sort -n -r
221.90.64.76
211.87.186.35
203.78.122.88
203.64.78.90
203.64.78.90
203.64.78.90
203.64.78.90
203.64.78.90
203.64.78.90
203.0.113.42
202.176.73.99
201.39.104.77
200.89.134.22
...
...
        
```
## uniq

The uniq command identifies and removes adjacent duplicate lines from sorted input. In the context of log analysis, this can be a useful tool for simplifying data lists (like collected IP addresses), especially when log entries may contain repeated or redundant information. The uniq command is often combined with the sort command to sort the data before removing the duplicate entries.

For example, the output of the sort command we ran above contains a few duplicate IP addresses, which is easier to spot when the data is sorted numerically. To remove these repeatedly extracted IPs from the list, we can run:
```
user@tryhackme$ cut -d ' ' -f 1 apache.log | sort -n -r | uniq
221.90.64.76
211.87.186.35
203.78.122.88
203.64.78.90
203.0.113.42
202.176.73.99
201.39.104.77
200.89.134.22
192.168.45.99
...
...
        
```
We can also append the -c option to output unique lines and prepend the count of occurrences for each line. This can be very useful for quickly determining IP addresses with unusually high traffic.
```
user@tryhackme$ cut -d ' ' -f 1 apache.log | sort -n -r | uniq -c
      1 221.90.64.76
      1 211.87.186.35
      1 203.78.122.88
      6 203.64.78.90
      1 203.0.113.42
      1 202.176.73.99
      1 201.39.104.77
      1 200.89.134.22
      1 192.168.45.99
...
...
        
```
## sed

Both sed and awk are powerful text-processing tools commonly used for log analysis. They are sometimes used interchangeably, but both commands have their use cases and can allow security analysts to manipulate, extract, and transform log data efficiently.

Using the substitute syntax, sed can replace specific patterns or strings into log entries. For example, to replace all occurrences of "31/Jul/2023" with "July 31, 2023" in the apache.log file, we can use:

```
user@tryhackme$ sed 's/31\/Jul\/2023/July 31, 2023/g' apache.log
203.0.113.42 - - [July 31, 2023:12:34:56 +0000] "GET /index.php HTTP/1.1" 200 1234 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.132 Safari/537.36"
120.54.86.23 - - [July 31, 2023:12:34:57 +0000] "GET /contact.php HTTP/1.1" 404 5678 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
...
...
 ```       
Note that the backslash character \ is required to "escape" the forward slash in our pattern and tell sed to treat the forward slash as a literal character. Also, note that the sed command does not change the apache.log file directly; instead, it only outputs the modified version of the file to the standard output in the command line. If you want to overwrite the file, you can add the -i option to edit the file in place or use a redirect operator > to save the output to the original or another file.

Caution: If you use the -i option with sed, you risk overwriting the original file and losing valuable data. Ensure to keep a backup copy!

## awk

For the awk command, a common use case, is conditional actions based on specific field values. For example, to print log entries where the HTTP response code is greater than or equal to 400 (which would indicate HTTP error statuses), we can use the following command:
```
user@tryhackme$ awk '$9 >= 400' apache.log
120.54.86.23 - - [31/Jul/2023:12:34:57 +0000] "GET /contact.php HTTP/1.1" 404 5678 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36"
156.98.34.12 - - [31/Jul/2023:12:35:02 +0000] "GET /about.php HTTP/1.1" 404 5678 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.85 Safari/537.36"
189.76.230.44 - - [31/Jul/2023:12:35:06 +0000] "GET /about.php HTTP/1.1" 404 1234 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.170 Safari/537.36"
...
...
```
In this case, we're using the $9 field (which in this log example refers to the HTTP status codes), requiring it to be greater than or equal to 400.

This only scratches the surface of the power of these commands, and it is highly encouraged to read more about their options and use cases here.

## grep

The grep command is a powerful text search tool widely used on UNIX systems and provides exceptional use cases in log analysis. It allows you to search for specific patterns or regular expressions within files or streams of text. Using grep can help analysts quickly identify relevant log entries that match specific criteria, particular resources or keywords, or patterns associated with security incidents.

The most basic usage of grep is to search for specific strings within log files. For example, if we are suspicious about any log entries that hit the /admin.php webpage on the server, we can grep for "admin" to return any relevant results:
```
user@tryhackme$ grep "admin" apache.log
145.76.33.201 - - [31/Jul/2023:12:34:54 +0000] "GET /admin.php HTTP/1.1" 200 4321 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.330 Safari/537.36"
```
Like the uniq -c command, we can append the -c option to grep to count the entries matching the search criteria. For example, because only a single line was returned in the above command, appending -c will return "1".
```
user@tryhackme$ grep -c "admin" apache.log
1
```
If we wanted to know which line number in the log file relates to the matched entries, we could add the -n option to help quickly locate specific occurrences:
```
user@tryhackme$ grep -n "admin" apache.log                           
37:145.76.33.201 - - [31/Jul/2023:12:34:54 +0000] "GET /admin.php HTTP/1.1" 200 4321 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.330 Safari/537.36"
```
In this case, the line number "37" is prepended to the log entry output.

Lastly, we can invert our command using the -v option only to select lines that do not contain the specified pattern or keyword(s). This can be useful for quickly filtering out unwanted or irrelevant lines from log files. For example, if we're not interested in any log entries that hit the /index.php page, we can run the following command to filter it out:
```
user@tryhackme$ grep -v "/index.php" apache.log | grep "203.64.78.90"
203.64.78.90 - - [31/Jul/2023:12:35:01 +0000] "GET /about.php HTTP/1.1" 404 4321 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.170 Safari/537.36"
203.64.78.90 - - [31/Jul/2023:12:34:53 +0000] "GET /about.php HTTP/1.1" 200 1234 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.210 Safari/537.36"
203.64.78.90 - - [31/Jul/2023:12:34:46 +0000] "GET /contact.php HTTP/1.1" 200 4321 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.100 Safari/537.36"
203.64.78.90 - - [31/Jul/2023:12:34:32 +0000] "GET /login.php HTTP/1.1" 404 5678 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.330 Safari/537.36"
203.64.78.90 - - [31/Jul/2023:12:34:25 +0000] "GET /about.php HTTP/1.1" 404 4321 "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/94.0.4606.81 Safari/537.36"
```
Notice that in the above command, we filtered out the index.php page and piped the output into another grep command that only pulled log entries that contained the IP address 203.64.78.90.

Like with awk and sed, grep is an extremely powerful tool that cannot be fully covered in a single task. It is highly encouraged to read more about it on the official GNU manual page here.

While command-line log analysis offers powerful capabilities, it might only suit some scenarios, especially when dealing with vast and complex log datasets. A dedicated log analysis solution, like the Elastic (ELK) Stack or Splunk, can be more efficient and offer additional log analysis and visualization features. However, the command line remains essential for quick and straightforward log analysis tasks.













