#!/bin/bash

# Options

set -eo pipefail

# Data

napps=( "sdntrace" "sdntrace_cp" "maintenance" "mef_eline" "pathfinder" "telemetry_int" "topology")
descriptions=( "from amlight" "from amlight" "from kytos" "from kytos" "from kytos" "from kytos" "from kytos")
options=( "Yes" "No" )
script_dir=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
kytos_UI_dir=$(dirname "$script_dir")
napp_dir=$kytos_UI_dir/src/components/dev/napps

# Functions

createNappDir(){
    if [[ -d $napp_dir ]]; then 
        echo "Napp directory already exists."
    else
        mkdir -p $napp_dir
        echo "Napp directory created."
    fi
}

downloadUI(){
    if [[ -d $napp_dir/${napps[$1]} ]]; then
        echo "Napp ${napps[$1]} UI already installed."
    else
        for url in $(curl -s https://api.github.com/repos/kytos-ng/${napps[$1]}/contents/ui/k-toolbar | \
                jq -r '.[] | select(.type=="file") | .download_url'); do
            wget $url -P $napp_dir/${napps[$1]}/k-toolbar
        done
        for url in $(curl -s https://api.github.com/repos/kytos-ng/${napps[$1]}/contents/ui/k-info-panel | \
                jq -r '.[] | select(.type=="file") | .download_url'); do
            wget $url -P $napp_dir/${napps[$1]}/k-info-panel
        done
                for url in $(curl -s https://api.github.com/repos/kytos-ng/${napps[$1]}/contents/ui/k-action-menu | \
                jq -r '.[] | select(.type=="file") | .download_url'); do
            wget $url -P $napp_dir/${napps[$1]}/k-action-menu
        done
        echo -e "Download was successful!\n"
    fi
}

installNapps(){
    echo -e "Press 1 to install the corresponding napp and 2 to ignore.\n"

    for napp in ${!napps[@]};
    do
        echo "Would you like to install ${napps[$napp]}?"
        echo "Description: ${descriptions[$napp]}"
        select option in ${options[@]}; do
            echo -e "The selected option was $option\n"
            case $option in
                Yes )
                    echo "Now downloading ${napps[$napp]}...";
                    downloadUI $napp
                    break
                    ;;
                No )
                    echo -e "${napps[$napp]} was not selected\n";
                    break
                    ;;
            esac
        done
    done
}

displayHelpInfo(){
    echo "This bash script is for managing the external UI located within the napp repos."
    echo
    echo "Syntax: manageNappUI [help|install|clean]"
    echo "options:"
    echo "help     Print this help message."
    echo "install     Install external UI from napps."
    echo "clean     Clean the napps folder of all files and directories."
    echo
}

# Main

case $1 in
    clean )
        rm -r $napp_dir/*
        echo "Cleaned napp dir."
        ;;
    install )
        createNappDir
        installNapps
        echo "Napps successfully installed."
        ;;
    help )
        displayHelpInfo
        ;;
    * )
        echo "No input was passed or input was invalid."
        echo "You can access the help menu by running the script with help."
        ;;
esac