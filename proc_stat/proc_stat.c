#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>

#define MAXBUFLEN 10000

int replaceNewLine(char s[]) {
    int j = 0;
    while (s[j] != '\0'){
        if (s[j] == '\n') {
            s[j] = '|';
        }
        j++;
    }
    return 0;
}

int getStat(const char* cmd) {
    char source[MAXBUFLEN + 1];
	FILE *proc; 
	proc = fopen(cmd, "r");
	if (proc) { 
		
	   size_t newLen = fread(source, sizeof(char), MAXBUFLEN, proc);
	   source[newLen++] = ';';
	   source[newLen] = '\0';	   /* Just to be safe. */

	   replaceNewLine(source);

	   fwrite(source, sizeof(char), newLen, stdout);

	   fclose(proc); 
	   return 1;
	} else {  
		return 0; 
    }
}

int main(void) {
	printf("Cache-Control: no-cache, no-store, must-revalidate\n");
	printf("Pragma: no-cache\n");
	printf("Expires: 0\n");
    printf("Content-Type: text/javascript\n\n");
	
	printf("getProcStat('");

	getStat("/sys/class/thermal/thermal_zone0/temp");
	getStat("/proc/meminfo");
	getStat("/proc/stat");
	
	printf("');");
	
	fflush(stdout);
	
	exit(0);
}