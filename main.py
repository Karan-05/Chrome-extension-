from google.cloud import monitoring_v3
from google.protobuf.timestamp_pb2 import Timestamp
from datetime import datetime, timezone
from flask import Flask, request, jsonify, make_response

app = Flask(__name__)

# Replace with your project ID
PROJECT_ID = "eighth-sensor-442821-b0"

# Replace with your actual Chrome extension ID
CHROME_EXTENSION_ID = "pilkehinoedpnafdnglblfkbnaeipdkh"

@app.route('/', methods=['POST', 'OPTIONS'])
def fetch_hardcoded_metric_data():
    # Handle preflight OPTIONS request
    if request.method == 'OPTIONS':
        response = make_response()
        response.headers.add("Access-Control-Allow-Origin", f"chrome-extension://{CHROME_EXTENSION_ID}")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Max-Age", "3600")
        return response, 204

    # Handle POST request
    try:
        client = monitoring_v3.MetricServiceClient()

        # Define the time range (hard-coded)
        start_time = datetime(2024, 12, 1, 2, 0, 0, tzinfo=timezone.utc)
        end_time = datetime(2024, 12, 1, 3, 0, 0, tzinfo=timezone.utc)

        # Convert to protobuf Timestamps
        start_timestamp = Timestamp()
        start_timestamp.FromDatetime(start_time)
        end_timestamp = Timestamp()
        end_timestamp.FromDatetime(end_time)

        # Define the metric type
        metric_type = "agent.googleapis.com/cpu/utilization"

        # Create the filter
        metric_filter = f'metric.type="{metric_type}" AND resource.type="gce_instance"'

        # Create the request
        request_list = monitoring_v3.ListTimeSeriesRequest(
            name=f"projects/{PROJECT_ID}",
            filter=metric_filter,
            interval={'start_time': start_timestamp, 'end_time': end_timestamp},
            view=monitoring_v3.ListTimeSeriesRequest.TimeSeriesView.FULL
        )

        # Fetch time series data
        cpu_usages = []
        for time_series in client.list_time_series(request=request_list):
            for point in time_series.points:
                cpu_usages.append(point.value.double_value)

        if not cpu_usages:
            summary = {"message": "No data found for the specified metric and time range."}
        else:
            # Summarize the data
            avg_cpu = sum(cpu_usages) / len(cpu_usages)
            max_cpu = max(cpu_usages)
            min_cpu = min(cpu_usages)

            summary = {
                "metric_type": metric_type,
                "resource_type": "gce_instance",
                "time_range": {
                    "start": start_time.isoformat(),
                    "end": end_time.isoformat()
                },
                "cpu_utilization": {
                    "average": avg_cpu,
                    "maximum": max_cpu,
                    "minimum": min_cpu
                }
            }

        # Create response with CORS headers
        response = make_response(jsonify(summary), 200)
        response.headers.add("Access-Control-Allow-Origin", f"chrome-extension://{CHROME_EXTENSION_ID}")
        return response

    except Exception as e:
        error_response = {"error": str(e)}
        response = make_response(jsonify(error_response), 500)
        response.headers.add("Access-Control-Allow-Origin", f"chrome-extension://{CHROME_EXTENSION_ID}")
        return response

# For Cloud Functions, define the entry point
def receive_data(request):
    return fetch_hardcoded_metric_data()